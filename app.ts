const cpfs = ["529.982.247-25", "12345678900", "111.111.111-11", "00000000000", "398.456.327-44"];

const limparCPF = (resultadoValido: boolean) => {
  let resultadoLimpo: string[] = [];
  let resultadoInvalido: string[] = [];
  cpfs.forEach(cpf => {
    const todosIguais = cpf.split('').every(char => char === cpf[0]);
    if(cpf.replace(/\D/g, '').length === 11 && !todosIguais) {
      
      resultadoLimpo.push(cpf.replace(/\D/g, ''));
    } else {
      resultadoInvalido.push(cpf);
    }
  });
  if(resultadoValido) {
    return resultadoLimpo
  }
  return resultadoInvalido;
}

console.log(limparCPF(true));