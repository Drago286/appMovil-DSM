#BackEnd

Requisitos previos antes de la clonacion del repositorio: 
1.Tener instalado PHP en tu estacion de trabajo. 
2.Instalar composer-> https://getcomposer.org 
3.Tener establecido cual sera tu administrador de bases de dato.

---PASOS PARA LA CLONACION--- 
1.Dentro de la carpeta del proyecto debe ejecutar el siguiente comando, a travez de la linea de comandos. "composer install" 
2.Generar tu archivo env "php artisan copy .env .example .env" 3.Generar tu KEY para el archivo .env que acabamos de generar. "php artisan key:generate"

---DENTRO DEL ARCHIVO .env--- 
Identifica y reemplazalo por tus valores:
DB_HOST='direccion IP de tu BD'
DB_PORT= 'numero del puerto de tu BD' 
DB_DATABASE= 'nombre del esquema que usaras en tu ABD' DB_USERNAME='USUARIO DE TU ABD' DB_PASSWORD= 'si tu usuario posee una password, ponla aqui, si no, ignora este campo'

---REALIZAR MIGRACIONES DE TABLAS--- 
Para poder migrar las tablas del proyecto a tu BD, debe ejecutar la siguiente linea de codigo en la linea de comandos: 
"php artisan migrate:fresh"

---INICAR PROYECTO--- 
Ya para finalizar y poder inicializar debes ejecutar el siguiente comando: 
"php artisan serve 0.0.0.0 --host "
