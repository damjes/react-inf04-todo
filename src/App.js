import './App.css';
import { useState, useRef } from 'react';

function App() {
  const zadaniaPoczatkowe = [
    {
      nazwa: 'Wyrzuć śmieci',
      wykonane: false,
    },
    {
      nazwa: 'Zmyj naczynia',
      wykonane: false,
    },
    {
      nazwa: 'Odkurz',
      wykonane: false,
    },
  ]

  const [zadania, setZadania] = useState(zadaniaPoczatkowe)

  const [noweZadanieState, setNoweZadanieState] = useState('')

  function dodajZadanieState() {
    const noweZadanie = {
      nazwa: noweZadanieState,
      wykonane: false
    }
    setZadania([...zadania, noweZadanie])
    setNoweZadanieState('')
  }

  const noweZadanieRef = useRef()

  function dodajZadanieRef() {
    const nazwa = noweZadanieRef.current.value
    const noweZadanie = { nazwa, wykonane: false }
    setZadania([...zadania, noweZadanie])
    noweZadanieRef.current.value = ''
  }

  function zmienZadanie(nazwa) {
    const nowaLista = zadania.map(zadanie => {
      if (zadanie.nazwa === nazwa) {
        return { ...zadanie, wykonane: !zadanie.wykonane }
      }
      return zadanie
    })

    setZadania(nowaLista)
  }

  function usunZadanie(nazwa) {
    const nowaLista = zadania.filter(zadanie => zadanie.nazwa !== nazwa)
    setZadania(nowaLista)
  }

  const lista = zadania.map(zadanie => 
    <li key={zadanie.nazwa} className={zadanie.wykonane ? 'wykonane' : ''}>
      <input
        type="checkbox"
        checked={zadanie.wykonane}
        onChange={() => zmienZadanie(zadanie.nazwa)}
        />
      <button onClick={() => usunZadanie(zadanie.nazwa)}>x</button>
      <span>
        {zadanie.nazwa}
      </span>
    </li>
  )

  const liczbaZadan = zadania.length
  const liczbaZadanNiewykonanych = zadania.filter(zadanie => !zadanie.wykonane).length

  return <>
    <h1>
      Todo lista
      {' '}
      {liczbaZadanNiewykonanych}/{liczbaZadan}
    </h1>
    <ul>{lista}</ul>
    <p>useState: <br/>
      Nowe zadanie:
      <input
        type="text"
        onChange={e => setNoweZadanieState(e.target.value)}
        value={noweZadanieState}
        />
      <button onClick={dodajZadanieState}>Dodaj</button>
    </p>
    <p>useRef: <br/>
      Nowe zadanie: <input type="text" ref={noweZadanieRef}/>
      <button onClick={dodajZadanieRef}>Dodaj</button>
    </p>
    </>
}

export default App;
