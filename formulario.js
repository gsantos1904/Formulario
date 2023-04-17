
function limpa_formulário_cep() {
            //Limpa valores do formulário de cep.
            document.getElementById('rua').value=("");
            document.getElementById('bairro').value=("");
            document.getElementById('cidade').value=("");
            document.getElementById('uf').value=("");
            
    }

    function meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            //Atualiza os campos com os valores.
            document.getElementById('rua').value=(conteudo.logradouro);
            document.getElementById('bairro').value=(conteudo.bairro);
            document.getElementById('cidade').value=(conteudo.localidade);
            document.getElementById('uf').value=(conteudo.uf);
            
        } //end if.
        else {
            //CEP não Encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
        }
    }
        
    function pesquisacep(valor) {

        //Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('rua').value="...";
                document.getElementById('bairro').value="...";
                document.getElementById('cidade').value="...";
                document.getElementById('uf').value="...";
                

                //Cria um elemento javascript.
                var script = document.createElement('script');

                //Sincroniza com o callback.
                script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

                //Insere script no documento e carrega o conteúdo.
                document.body.appendChild(script);

            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    };
	
	
	function FormataDado(campo, tammax, pos, teclapres) {   
  var keyCode; 
  if (teclapres.srcElement) 
  {
    keyCode = teclapres.keyCode; 
  } else  if (teclapres.target) 
  {
  keyCode = teclapres.which; 
  }
  if (keyCode == 0 || keyCode == 8) { return true; }  
  if ((keyCode < 48 || keyCode > 57) && keyCode != 88 && (keyCode != 120)) { return false; }  
  var tecla = keyCode; 
  vr = campo.value;   
  vr = vr.replace("-", "");   
  vr = vr.replace("/", ""); 
  
  tam = vr.length;
  if (tam < tammax && tecla != 8) 
  { tam = vr.length + 1; } 
  if (tecla == 8) 
{
    tam = tam - 1; 
}
  if (tecla == 8 || tecla == 88 || tecla >= 48 && tecla <= 57 || tecla >= 96 && tecla <= 105 || tecla == 120) 
{
  if (tam <= 2) 
{
      campo.value = vr; 
}
  if (tam > pos && tam <= tammax) 
{
campo.value = vr.substr(0, tam - pos) + "-" + vr.substr(tam - pos, tam); 
}
}
}