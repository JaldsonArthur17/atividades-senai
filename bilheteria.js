function verificarEmail(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const emailsCadastrados = ['reservas@dominio.com', 'cliente@dominio.com'];
            if (emailsCadastrados.includes(email)) {
                reject('Email já cadastrado para outra reserva');
            } else {
                resolve('Email válido');
            }
        }, 1500);
    });
}

function exibirFeedback(mensagem, tipo = 'error') {
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.textContent = mensagem;
    feedbackElement.style.color = tipo === 'success' ? 'green' : 'red';

    feedbackElement.style.opacity = '1';
    feedbackElement.classList.add('fadeIn');

    setTimeout(() => {
        feedbackElement.style.opacity = '0';
    }, 3000);
}

document.getElementById('formReserva').addEventListener('submit', function (e) {
    e.preventDefault(); 

    exibirFeedback('');

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const ingressos = document.getElementById('ingressos').value;
    const cartao = document.getElementById('cartao').value.trim();
    const data = document.getElementById('data').value.trim();
    const termos = document.getElementById('termos').checked;

    if (!nome) {
        exibirFeedback('O campo Nome é obrigatório');
        return;
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        exibirFeedback('Por favor, insira um email válido');
        return;
    }

    if (ingressos < 1 || ingressos > 10) {
        exibirFeedback('O número de ingressos deve ser entre 1 e 10');
        return;
    }

    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(cartao)) {
        exibirFeedback('Número de cartão inválido. O formato é XXXX XXXX XXXX XXXX');
        return;
    }

    if (!data || new Date(data) < new Date()) {
        exibirFeedback('A data do filme não pode ser no passado');
        return;
    }

    if (!termos) {
        exibirFeedback('Você deve aceitar os Termos e Condições');
        return;
    }

    verificarEmail(email)
        .then(() => {
            exibirFeedback('Reserva realizada com sucesso!', 'success');

            document.getElementById('formReserva').reset();

            localStorage.setItem('reserva', JSON.stringify({
                nome,
                email,
                filme: document.getElementById('filme').value,
                ingressos
            }));
        })
        .catch((erro) => {
            exibirFeedback(erro);
        });
});
