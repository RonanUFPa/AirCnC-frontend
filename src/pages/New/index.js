import React, { useState, useMemo } from 'react';
import api from '../../services/Api';
import './styles.css';
import camera  from '../../assets/camera.svg'

export default function New({ history }) {
  const [thumbmail, setThumbmail] = useState(null);
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');

  const  preview = useMemo(() => {
    return thumbmail ? URL.createObjectURL(thumbmail) : null;
  }, [thumbmail])
 
  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem('User');

    data.append('thumbmail', thumbmail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('/spots', data, {
      headers: { user_id }
    })
    history.push('/dashboard');
  }
  return (
    <form onSubmit={handleSubmit}>
      <label id="thumbmail" 
      style={{ backgroundImage: `url(${preview})` }}
      className={thumbmail ? 'has-thumbmail' : ''}
      >
        <input type="file" onChange={event => setThumbmail(event.target.files[0])} />
        <img src={camera} alt="select img" />
      </label>

      <label htmlFor="company">EMPRESA *</label>
      <input
        id="company"
        placeholder="Sua empresa incrível"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor="techs">TECNOLOGIAS *<span>(Separadas por vírgula)</span> </label>
      <input
        id="techs"
        placeholder="Quais tecnologias usam?"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor="price">VALOR DA DIÁRIA<span>(Em branco para GRATUITO)</span></label>
      <input
        id="price"
        placeholder="Valor da diária por dia"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />
      <button type="submit" className="btn">CADASTRAR</button>
    </form>
  )
}
