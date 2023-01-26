import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const checkHipotenusa = (c, h) => {
  Number(c);
  Number(h);
  if (Number(c) > Number(h)) {
    return true;
  }
  return false;
};

function App() {
  const { register, handleSubmit } = useForm();

  const [result, setResult] = useState(0);
  const [blockBtn, setBlockBtn] = useState("btn");
  const [hnum, setHnum] = useState(0);
  const [c1num, setC1num] = useState(0);
  const [c2num, setC2num] = useState(0);
  const [disableNum, setDisableNum] = useState("black");

  const onSubmit = ({ c1, c2, h }) => {
    let count = 0;
    setResult("Calculando...");
    setBlockBtn("disable");
    setDisableNum("black");

    if (c1 <= 0) {
      c1 = "0";
      count++;
    }

    if (c2 <= 0) {
      c2 = "0";
      count++;
    }

    if (h <= 0) {
      h = "0";
      count++;
    }

    if (count != 1) {
      setResult("Preencha os dois campos");
      setTimeout(() => {
        setBlockBtn("btn");
      }, 500);
      return;
    }

    if (c1 <= 0 || c2 <= 0) {
      if (checkHipotenusa(c1, h) || checkHipotenusa(c2, h)) {
        count == 1
          ? setResult("A Hipotenusa não pode ser menor que o Cateto")
          : setResult("Preencha os dois campos");
        setTimeout(() => {
          setBlockBtn("btn");
        }, 500);
        return;
      }
    }

    axios
      .post("https://api-calculadora-hoiw.onrender.com/", {
        data: {
          c1,
          c2,
          h,
        },
      })
      .then(({ data }) => {
        setResult(data.result);
        setC1num(data.c1);
        setC2num(data.c2);
        setHnum(data.h);
        setDisableNum("");
        setBlockBtn("btn");
      })
      .catch((e) => {});
  };

  return (
    <div>
      <h1>Teorema de Pitagoras</h1>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div>
            <label>Cateto</label>
            <input type="number" {...register("c1")} min="0" step="0.01" />
          </div>
          <div>
            <label>Cateto</label>
            <input type="number" {...register("c2")} min="0" step="0.01" />
          </div>
          <div>
            <label>Hipotenusa</label>
            <input type="number" {...register("h")} min="0" step="0.01" />
          </div>
          <button className={blockBtn} type="submit">
            Calcular
          </button>
        </form>
        <div className="result">
          {isNaN(result) ? result : result.toFixed(4)}
        </div>
        <div className="containerImage">
          <div className="hipotenusa">
            Hipotenusa <span className={disableNum}>{hnum.toFixed(2)}</span>
          </div>
          <p className="cateto1">
            Cateto <span className={disableNum}>{c1num.toFixed(2)}</span>
          </p>
          <p className="cateto2">
            Cateto <span className={disableNum}>{c2num.toFixed(2)}</span>
          </p>
          <div className="image"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
