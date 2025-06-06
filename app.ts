const cpfs = ["529.982.247-25", "12345678900", "111.111.111-11", "00000000000", "398.456.327-44"];

const calcularDigito = (cpfBase: string, pesos: number[]): number => {
  const soma = cpfBase
    .split('')
    .map((num, i) => parseInt(num) * pesos[i])
    .reduce((acc, val) => acc + val, 0);

  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
};

const limparCPF = (resultadoValido: boolean) => {
  let resultadoLimpo: string[] = [];
  let resultadoInvalido: string[] = [];

  cpfs.forEach(cpf => {
    const todosIguais = cpf.split('').every(char => char === cpf[0]);

    if (cpf.replace(/\D/g, '').length === 11 && !todosIguais) {
      resultadoLimpo.push(cpf.replace(/\D/g, ''));
    } else {
      resultadoInvalido.push(cpf);
    }
  });

  return resultadoValido ? resultadoLimpo : resultadoInvalido;
};


const calcularDigitosVerificadores = (cpf: string) => {

  const cpfLimpo = cpf.replace(/\D/g, '');

  const pesos1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
  const primeiroDigito = calcularDigito(cpfLimpo.slice(0, 9), pesos1);

  const pesos2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  const segundoDigito = calcularDigito(cpfLimpo.slice(0, 9) + primeiroDigito, pesos2);

  return [primeiroDigito, segundoDigito];
};


const validarCPF = (cpf: string): boolean => {
  const cpfLimpo = cpf.replace(/\D/g, '');


  if (cpfLimpo.length !== 11 || /^(\d)\1+$/.test(cpfLimpo)) {
    return false;
  }

  const [primeiroDigito, segundoDigito] = calcularDigitosVerificadores(cpf);

  return cpfLimpo[9] === primeiroDigito.toString() && cpfLimpo[10] === segundoDigito.toString();
};


limparCPF(true).forEach(cpf => {
  const valido = validarCPF(cpf);
  console.log(`O CPF ${cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')} é válido? ${valido ? 'Sim' : 'Não'}`);
});
