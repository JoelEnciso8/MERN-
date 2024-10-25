function Alerta({ alerta }) {
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} text-center p-4 mb-4 text-sm rounded-xl bg-gradient-to-br uppercase text-white font-bold`}>
      {alerta.msg}
    </div>
  );
}

export default Alerta;
