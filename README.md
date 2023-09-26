# Meu Enxoval Front-end

Este projeto contempla os requisitos para entrega do MVP da Sprint II da disciplina: **Desenvolvimento Back-end Avançado**, do curso de Pós-Graduação em Desenvolvimento FullStack pela PUC-Rio.

O objetivo deste MVP (Minimum Viable Product) é utilizar do conteúdo ensinado durante as aulas para a criação de um sistema web de Enxoval de bebê, que auxilie as mães de primeira viagem ou qualquer outra pessoa que deseja criar uma lista de enxoval.
Este Sistema possibilita ao usuário ``Adicionar`` itens à lista, como:
**Nome do Produto, Tamanho e Quantidade.**
Também permite ``visualizar``,``Editar e Excluir`` os itens inseridos na lista. 
Esse Sistema Web garante uma interface de usuário simples, amigável, e intuitiva, que permita aos usuários realizar todas as operações mencionadas de forma fácil e rápida. E após realizar todas as operações e inserir os itens desejados, a lista estará disponível para download em formato xlsx.
Só é possível realizar o download da lista porque o sistema integra uma API pública que permite aos usuários exportar a lista de enxoval de bebê em formato Excel (por exemplo, .xlsx) para facilitar o compartilhamento e o armazenamento offline.

Para os códigos aqui compartilhados, será explorado o componente A do MVP, assim como o B e C, que são Front-end, API externa e Back-end Banco de Dados respectivamente.

## Arquitetura
Diagrama da arquitetura da aplicação e estratégias de comunicação implementadas neste MVP:
>https://drive.google.com/file/d/1FhFoFzJZCfz99QRLVnd7GHBNPOcQVcvA/view?usp=share_link

## Como Executar
Basta clonar o repositório (ou fazer o download do projeto), ter a API (back-end) funcionando e abrir o arquivo index.html no seu browser.

## Como executar através do Docker
Certifique-se de ter o Docker instalado e em execução em sua máquina.

Navegue até o diretório que contém o Dockerfile no terminal. Execute como administrador o seguinte comando para construir a imagem Docker:

```
$ docker build -t nome_da_sua_imagem
```
Uma vez criada a imagem, para executar o container basta executar, como administrador, o seguinte comando:

```
$ docker run -d -p 8080:80 nome_da_sua_imagem
```
Uma vez executando, para acessar o front-end, basta abrir o http://localhost:8080/#/ no navegador.

## Licença de Uso API
SheetJS Community Edition is licensed under the "Apache 2.0 License". All rights not explicitly granted by the Apache 2.0 License are reserved by SheetJS LLC.
```
SheetJS Community Edition -- https://sheetjs.com/

Copyright (C) 2012-present   SheetJS LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
