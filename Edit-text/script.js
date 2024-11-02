const input = document.querySelector('#arquivo');
const preview = document.querySelector('#preview');
const btnDownload = document.querySelector('#download');

// Evento para checar por mudanças na página
input.addEventListener('change', function(){
    console.log(this.files);
    const arquivo = this.files[0];
    const leitor = new FileReader(); // Leitor de arquivos

    // Verifica se há algum arquivo e o lê
    if (arquivo) {
        leitor.readAsText(arquivo);
        
    };

    // Se algum arquivo for lido pegue o valor/conteudo
    leitor.addEventListener('load', function () {
        preview.value = leitor.result;
    });
})

// Gerando um arquivo para download
const download = function () {
    // Cria um elemento na pagina
    const a = document.createElement('a');
    a.style = 'display: none'; // fica oculto
    document.body.appendChild(a);
    return function(conteudo, nomeArquivo){
        // Cria o arquivo
        const blob = new Blob([conteudo], {type:'octet/stream'});

        // Pega o link da pagina
        const url = window.URL.createObjectURL(blob);

        // Cria o link de download do arquivo e clica no link
        a.href = url;
        a.download = nomeArquivo;
        a.click();
        
        // Removendo link do arquivo (boas praticas)
        window.URL.revokeObjectURL(url);
    };
}

btnDownload.addEventListener('click', function () {
    download()(preview.value, 'teste.txt')
})