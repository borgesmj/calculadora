import React, {useState} from "https://esm.sh/react@18.2.0";
import ReactDOM from "https://esm.sh/react-dom@18.2.0";

// PILAS
// SOLO COPIAR PARA CODEPEN
// DESDE AQUI

const App = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [answer, setAnswer] = useState('');
  const [total, setTotal] = useState(false);
  const handleClick = (value) => {
    if (/\d/.test(value)) {
      if (expression[expression.length - 1] === '=') {
        setDisplay(value);
        setExpression(value);
      } else {
        if (display === '0') {
          setDisplay(value);
          setExpression(value);
        } else {
          setDisplay(display + value);
          setExpression(expression + value);
        }
        if (/0/.test(value) && display === '0') {
          return;
        }
      }
    } else {
      if (/C/.test(value)) {
        setExpression(expression.slice('', expression.length - 1));
        setDisplay(display.toString().slice(0, display.length - 1));
      }
      if (/AC/.test(value)) {
        setExpression('');
        setDisplay('0');
      }
      if (/\./.test(value)) {
        if (expression[expression.length - 1] === '=') {
          setDisplay('0' + value);
          setExpression('0' + value);
        } else {
          if (display.toString().includes('.')) {
            return;
          } else if (display === '0') {
            setExpression('0' + value);
            setDisplay(display + value);
          } else {
            setExpression(expression + value);
            setDisplay(display + value);
          }
        }
      }
      if (/=/.test(value)) {
        evalExpression(value);
      }
      if (/[-+*/]/.test(value)) {
        if (/=/i.test(expression)) {
          const expressionWithoutEqual = expression.slice(0, -1);
          setExpression(eval(expressionWithoutEqual) + value);
          setDisplay(value);
        } else if (value === '-' && expression.includes('-')) {
          setExpression(expression + value);
          setDisplay(value);
        } else if (/[+*/-]/.test(expression)) {
          if (/[-+*/]/.test(value)) {
            const lastChar = expression.slice(-1);
            if (/[-+*/]/.test(lastChar)) {
              setExpression(expression.slice(0, -1) + value);
              setDisplay(value);
              return;
            }
          }

          setExpression(eval(expression) + value);
          setDisplay(value);
        } else {
          setExpression(expression + value);
          setDisplay(value);
        }
      }
    }
  };

  const evalExpression = (value) => {
    if (/=/.test(value)) {
      setExpression(expression + value);
      setDisplay(eval(expression));
      setTotal(eval(expression));
    } else {
      setExpression(eval(expression) + value);
      setDisplay(value);
    }
  };
  return (
    <div>
      <Pantalla expression={expression} display={display} />
      <Teclado handleClick={handleClick} />
    </div>
  );
};

const Pantalla = ({ expression, display }) => {
  return (
    <div className="pantalla">
      <form>
        <input type="text" value={expression} disabled />
        <input type="text" value={display} disabled id="display" />
      </form>
    </div>
  );
};

const Teclado = ({ handleClick }) => {
  const botones = [
    { value: 'AC', id: 'clear', class: 'clear' },
    { value: 'C', id: 'clear-two', class: 'clear' },
    { value: '/', id: 'divide', class: 'operator' },
    { value: '7', id: 'seven', class: 'number' },
    { value: '8', id: 'eight', class: 'number' },
    { value: '9', id: 'nine', class: 'number' },
    { value: '*', id: 'multiply', class: 'operator' },
    { value: '4', id: 'four', class: 'number' },
    { value: '5', id: 'five', class: 'number' },
    { value: '6', id: 'six', class: 'number' },
    { value: '-', id: 'subtract', class: 'operator' },
    { value: '1', id: 'one', class: 'number' },
    { value: '2', id: 'two', class: 'number' },
    { value: '3', id: 'three', class: 'number' },
    { value: '+', id: 'add', class: 'operator' },
    { value: '0', id: 'zero', class: 'number' },
    { value: '.', id: 'decimal', class: 'number' },
    { value: '=', id: 'equals', class: 'operator' },
  ];
  return (
    <div className="buttons_pad">
      {botones.map((item) => (
        <button
          id={item.id}
          key={item.id}
          className={item.class}
          onClick={() => handleClick(item.value)}
        >
          {item.value}
        </button>
      ))}
    </div>
  );
};

// HASTA AQUI



ReactDOM.render(<App />, document.getElementById("app"));
