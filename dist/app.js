"use strict";
const cpfs = ["529.982.247-25", "12345678900", "111.111.111-11", "00000000000", "398.456.327-44"];
const calcularDigito = (cpfBase, pesos) => {
    const soma = cpfBase
        .split('')
        .map((num, i) => parseInt(num) * pesos[i])
        .reduce((acc, val) => acc + val, 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
};
const limparCPF = (resultadoValido) => {
    let resultadoLimpo = [];
    let resultadoInvalido = [];
    cpfs.forEach(cpf => {
        // Verifica se todos os dígitos são iguais
        const todosIguais = cpf.split('').every(char => char === cpf[0]);
        // Valida o CPF: deve ter 11 dígitos e não pode ter todos os dígitos iguais
        if (cpf.replace(/\D/g, '').length === 11 && !todosIguais) {
            resultadoLimpo.push(cpf.replace(/\D/g, ''));
        }
        else {
            resultadoInvalido.push(cpf);
        }
    });
    return resultadoValido ? resultadoLimpo : resultadoInvalido;
};
// Função para calcular os dígitos verificadores
const calcularDigitosVerificadores = (cpf) => {
    // Remove qualquer pontuação
    const cpfLimpo = cpf.replace(/\D/g, '');
    // Cálculo do primeiro dígito (pesos de 10 a 2)
    const pesos1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    const primeiroDigito = calcularDigito(cpfLimpo.slice(0, 9), pesos1);
    // Cálculo do segundo dígito (pesos de 11 a 2)
    const pesos2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    const segundoDigito = calcularDigito(cpfLimpo.slice(0, 9) + primeiroDigito, pesos2);
    return [primeiroDigito, segundoDigito];
};
// Função para validar o CPF
const validarCPF = (cpf) => {
    const cpfLimpo = cpf.replace(/\D/g, '');
    // Verifica se o CPF tem 11 dígitos e se não tem todos os dígitos iguais
    if (cpfLimpo.length !== 11 || /^(\d)\1+$/.test(cpfLimpo)) {
        return false;
    }
    // Calcula os dois dígitos verificadores
    const [primeiroDigito, segundoDigito] = calcularDigitosVerificadores(cpf);
    // Compara os dígitos calculados com os dois últimos dígitos do CPF
    return cpfLimpo[9] === primeiroDigito.toString() && cpfLimpo[10] === segundoDigito.toString();
};
// Exemplo de uso:
limparCPF(true).forEach(cpf => {
    const valido = validarCPF(cpf);
    console.log(`O CPF ${cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')} é válido? ${valido ? 'Sim' : 'Não'}`);
});
