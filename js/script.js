console.log('Olá do JavaScript!');

document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.querySelector('.search-bar input'); // Adicionado para obter o input da busca
    const bibleModal = document.getElementById('bibleModal');
    const closeButton = document.querySelector('.close-button');
    const verseText = document.querySelector('.verse-text');
    const explanationText = document.querySelector('.explanation-text');
    const referenceText = document.querySelector('.reference-text');
    const modalTitle = document.querySelector('.modal-title');

    const devocionalButton = document.querySelector('.devocional-button'); // Novo botão
    const devotionalModal = document.getElementById('devotionalModal'); // Novo modal
    const devotionalCloseButton = devotionalModal.querySelector('.close-button');
    const devotionalModalTitle = devotionalModal.querySelector('.modal-title');
    const devotionalContentText = devotionalModal.querySelector('.devotional-content');
    const devotionalDateText = devotionalModal.querySelector('.devotional-date');
    const devotionalVersesText = devotionalModal.querySelector('.devotional-title'); // Usando como título dos versículos

    const modalHeaderTitle = "As Escrituras contém todas as respostas";

    // Conteúdo do Devocional Diário (comentado, agora será carregado do webhook)
    /*
    const dailyDevotional = {
        "date": "13 de Julho de 2025",
        "title": "13 de Julho de 2025",
        "content": "_\"Portanto, vós orareis assim: Pai nosso que estás nos céus, santificado seja o Teu nome. Venha o Teu reino. Faça-se a Tua vontade, assim na Terra como no Céu. O pão nosso de cada cada dia dá-nos hoje. E perdoa-nos nossas dívidas assim como temos perdoado aos nossos devedores. E não nos deixes cair em tentação, mas livra-nos do mal, pois Teu é o reino, o poder e a glória para sempre. Amém.\" Mateus 6:9-13_ **Pensamento:** Essa oração que Jesus ensinou aos Seus discípulos é um exemplo, um modelo de como devem ser as nossas orações. Começa com adoração e louvor a Deus, o Pai. Procura o cumprimento das Suas promessas para a nossa vida diária e perdão dos nossos pecados, buscando a força e a vitória do Senhor. Encerrando, tributa honra e gloria ao Governador do Universo, o Redentor da humanidade. A oração modelo começa com a garantia de que Deus é o nosso Pai, e isso nos motiva a glorificá-Lo. Jesus praticou a oração com regularidade e freqüência, e nos ensinou a orar também. Seu grande objetivo sempre foi reconduzir as pessoas a Deus através da redenção e da adoção como filhos. A oração do Senhor contém sete petições por bênçãos espirituais e apenas um pedido por necessidades materiais. Precisamos sempre nos lembrar disso. A oração do Senhor revela Jesus Cristo. Com certeza, Nele estão centralizadas todas as palavras dessa oração. Quais são as primeiras palavras? Pai nosso, que estas nos céus. Foi na cruz que essas palavras se tornaram possíveis, e logo após a ressurreição Jesus disse: \"Subo para meu Pai, e vosso Pai, para meu Deus e vosso Deus.\" João 20:17. O Salvador morreu por nós. **Oração:** Senhor, quero ser como as criancinhas para poder alcançar as tuas bênçãos. Faça-nos dignos de misericórdia, pois precisamos e somos dependentes de ti. Quero te pedir meu Deus não nos deixe faltar: fé, esperança, longanimidade e confiança, pois queremos alcançar o céu de glória, que preparaste para nós. Deus te peço para este dia, paz e graça para vencer as lutas. Te agradeço Deus, pois Tú és o meu Deus! Tú és digno de louvor e honra para todo o sempre !!! Sei que não nos desampararás !!! Creio nesta oração. Creio em ti. Quero te agradecer, pois não mereço tanto amor. Mas Tú me amaste primeiro e sou agradecida por este amor incomparável. Te amo Jesus! Que o teu Espírito Santo permaneça em mim! Em nome de Jesus. Amém."
    };
    */

    // Função para exibir o modal do Devocional Diário
    function displayDailyDevotional() {
        devotionalModalTitle.textContent = "Carregando Devocional..."; // Mensagem de carregamento
        devotionalVersesText.textContent = '';
        devotionalContentText.innerHTML = '';
        devotionalDateText.textContent = '';
        devotionalModal.style.display = 'flex';

        fetch('https://n8n-n8n-start.kof6cn.easypanel.host/webhook/99b23024-bffd-4095-b97b-2714e96eecb7', {
            method: 'GET', // Assumindo um método GET para buscar o devocional
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Resposta do webhook devocional:', data);

            // Verifica se a resposta contém os dados esperados (agora é um objeto, não um array)
            if (data && typeof data === 'object' && data.Titulo !== undefined && data.Versiculo !== undefined) {
                const devotional = data; // Acessa o objeto diretamente
                devotionalModalTitle.textContent = devotional.Titulo; // O 'Titulo' do webhook (ex: "Devocional Diário")

                devotionalVersesText.textContent = devotional.Versiculo; // O 'Versiculo' do webhook

                // Combinando Pensamento e Oracao no conteúdo principal, com formatação em negrito
                let combinedContent = '';
                if (devotional.Pensamento) {
                    combinedContent += '<strong>Pensamento:</strong> ' + devotional.Pensamento.replace(/\n/g, '<br>');
                }
                if (devotional.Oracao) {
                    combinedContent += (combinedContent ? '<br><br>' : '') + '<strong>Oração:</strong> ' + devotional.Oracao.replace(/\n/g, '<br>');
                }
                devotionalContentText.innerHTML = combinedContent;

                devotionalDateText.textContent = ''; // Não se preocupe mais com a data
            } else {
                devotionalModalTitle.textContent = "Erro";
                devotionalVersesText.textContent = "Nenhum devocional válido encontrado no webhook.";
                devotionalContentText.innerHTML = '';
                devotionalDateText.textContent = '';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar devocional:', error);
            devotionalModalTitle.textContent = "Erro";
            devotionalVersesText.textContent = "Ocorreu um erro ao carregar o devocional.";
            devotionalContentText.innerHTML = '';
            devotionalDateText.textContent = ''; // Não se preocupe mais com a data
        });
    }

    // Função para executar a busca
    function executeSearch() {
        const searchTerm = searchInput.value.trim(); // Captura o valor do input e remove espaços em branco

        if (searchTerm === '') {
            // Opcional: mostrar uma mensagem para o usuário se a busca estiver vazia
            modalTitle.textContent = modalHeaderTitle;
            verseText.textContent = "Por favor, digite algo para buscar.";
            explanationText.textContent = '';
            referenceText.textContent = '';
            bibleModal.style.display = 'flex';
            return;
        }

        // Exibe mensagem de carregamento no modal
        modalTitle.textContent = modalHeaderTitle;
        verseText.textContent = "Buscando nas Escrituras...";
        explanationText.textContent = '';
        referenceText.textContent = '';
        bibleModal.style.display = 'flex';

        // Envia o termo de busca para o webhook
        fetch('https://n8n-n8n-start.kof6cn.easypanel.host/webhook/3478bc45-2a7c-4697-9209-92a66ef643a0', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: searchTerm }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Resposta do webhook:', data);
            console.log('Tipo de dado da resposta:', typeof data);

            if (data && typeof data === 'object' && data.text !== undefined && data.reference !== undefined) {
                // Acessa as propriedades diretamente do objeto data
                verseText.textContent = data.text;
                explanationText.textContent = ''; 
                referenceText.textContent = data.reference;
            } else {
                verseText.textContent = "Nenhuma resposta válida encontrada no webhook (formato inesperado ou faltando texto/referência).";
                explanationText.textContent = '';
                referenceText.textContent = '';
            }
        })
        .catch(error => {
            console.error('Erro ao enviar para o webhook ou processar resposta:', error);
            verseText.textContent = "Ocorreu um erro ao obter a resposta das Escrituras.";
            explanationText.textContent = '';
            referenceText.textContent = '';
        });
    }

    // Quando o ícone de busca é clicado, executa a busca
    searchIcon.addEventListener('click', executeSearch);

    // Quando a tecla Enter é pressionada no campo de busca, executa a busca
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            executeSearch();
        }
    });

    // Quando o botão "Devocional Diário" é clicado, exibe o modal do devocional
    devocionalButton.addEventListener('click', displayDailyDevotional);
    console.log('Event listener para devocionalButton adicionado');

    // Quando o botão de fechar (x) do modal bíblico é clicado, fecha-o
    closeButton.addEventListener('click', function() {
        bibleModal.style.display = 'none';
        console.log('Modal bíblico fechado');
    });

    // Quando o botão de fechar (x) do modal devocional é clicado, fecha-o
    devotionalCloseButton.addEventListener('click', function() {
        devotionalModal.style.display = 'none';
        console.log('Modal devocional fechado');
    });

    // Quando o usuário clica em qualquer lugar fora do modal, fecha-o
    window.addEventListener('click', function(event) {
        if (event.target == bibleModal) {
            bibleModal.style.display = 'none';
            console.log('Modal bíblico fechado por clique fora');
        } else if (event.target == devotionalModal) {
            devotionalModal.style.display = 'none';
            console.log('Modal devocional fechado por clique fora');
        }
    });

    // Adiciona a funcionalidade de copiar texto ao botão de compartilhamento
    const shareButtons = document.querySelectorAll('.share-button');
    console.log('Número de botões de compartilhar encontrados:', shareButtons.length);
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Botão de compartilhar clicado');
            // Verifica qual modal está aberto
            const bibleModal = document.getElementById('bibleModal');
            const devotionalModal = document.getElementById('devotionalModal');
            let textToCopy = '';

            if (bibleModal.style.display === 'flex') {
                console.log('Modal bíblico aberto');
                // Copia o texto do modal bíblico
                const verseText = bibleModal.querySelector('.verse-text');
                const explanationText = bibleModal.querySelector('.explanation-text');
                const referenceText = bibleModal.querySelector('.reference-text');
                textToCopy = verseText.textContent + '\n\n' + explanationText.textContent + '\n\n' + referenceText.textContent;
            } else if (devotionalModal.style.display === 'flex') {
                console.log('Modal devocional aberto');
                // Obtém os elementos do devocional
                const devotionalTitle = devotionalModal.querySelector('.devotional-title').textContent;
                const devotionalContent = devotionalModal.querySelector('.devotional-content').textContent;
                
                // Formata o texto com uma estrutura clara e legível
                textToCopy = `
${devotionalTitle}\n\n
${devotionalContent}\n\n
Compartilhado através do Search the Scriptures`;
            }

            console.log('Texto a ser copiado:', textToCopy);
            // Copia o texto
            const tempInput = document.createElement('textarea');
            tempInput.value = textToCopy;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);

            // Exibe a mensagem "Copiado"
            const copiedMessage = document.createElement('span');
            copiedMessage.textContent = 'Copiado!';
            copiedMessage.style.position = 'absolute';
            copiedMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            copiedMessage.style.color = '#fff';
            copiedMessage.style.padding = '6px 12px';
            copiedMessage.style.borderRadius = '4px';
            copiedMessage.style.fontSize = '14px';
            copiedMessage.style.right = '100%';
            copiedMessage.style.marginRight = '10px';
            copiedMessage.style.top = '50%';
            copiedMessage.style.transform = 'translateY(-50%)';
            copiedMessage.style.opacity = '1';
            copiedMessage.style.transition = 'opacity 0.5s ease';
            button.appendChild(copiedMessage);

            // Remove a mensagem após 2 segundos
            setTimeout(() => {
                copiedMessage.style.opacity = '0';
                setTimeout(() => {
                    button.removeChild(copiedMessage);
                }, 500); // Espera meio segundo após a animação terminar
            }, 2000);
        });
    });
}); 