cd Desktop
mkdir projeto_responsivo
cd projeto_responsivo

mkdir public
mkdir src
mkdir docs


cd public
mkdir html
mkdir css
mkdir media
mkdir js


cd html
echo Projeto Responsivo > home.html

cd ..
cd css
echo body { margin: 0; padding: 0; background-color: lighgray; } > theme.css


cd ..
cd media
mkdir imagens
mkdir fontes

cd ..
cd css
copy theme.css ..\..\docs


cd ..
cd js
echo console.log("Site responsivo pronto!"); > responsivo.js
echo console.log("Utilitários carregados!"); > utils.js
rename utils.js helpers.js

cd ..
tree


cd ..
cd docs
del theme.css

cd..
cd public/html
notepad home.html



