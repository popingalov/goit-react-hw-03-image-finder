import ReactDOM from 'react-dom';
import App from './App';
import react from 'react';
import 'modern-normalize/modern-normalize.css';
import 'index.css';
const root = document.querySelector('#root');

ReactDOM.render(
  <react.StrictMode>
    <App />
  </react.StrictMode>,
  root,
);
/* function testXor(numbers) {
  return numbers.reduce((acc, e) => {
    console.log(acc, e);
    return acc ^ e;
  });
}
const test = [1, 1, 2, 2, 8, 7, 3, 3, 4, 4];
console.log(testXor(test)); */
