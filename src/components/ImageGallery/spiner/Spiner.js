import s from './Spiner.module.css';

export default function Spiner() {
  return (
    <div className={s.loader}>
      <div className={`${s.inner} ${s.one}`}></div>
      <div className={`${s.inner} ${s.two}`}></div>
      <div className={`${s.inner} ${s.three}`}></div>
    </div>
  );
}
