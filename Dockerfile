# Imagen oficial con Node, Chrome, Firefox, Edge y el binario de Cypress preinstalados.
# La versión debe coincidir EXACTAMENTE con la de "cypress" en package.json.
FROM cypress/included:16.1.1

WORKDIR /e2e

# Primero solo los manifiestos: así la capa de dependencias se cachea mientras
# package.json y package-lock.json no cambien.
COPY package.json package-lock.json ./

# El binario de Cypress ya viene en la imagen: no hace falta descargarlo otra vez.
RUN CYPRESS_INSTALL_BINARY=0 npm ci --no-audit --no-fund

# Código de la suite (el .dockerignore excluye .env, node_modules, reportes, etc.)
COPY . .

# La imagen base ya define ENTRYPOINT ["cypress", "run"]; lo dejamos explícito.
# Chrome porque Electron está deprecado en Cypress 16. Los reportes se generan en
# /e2e/reports/mochawesome (montar /e2e/reports como volumen para recuperarlos).
ENTRYPOINT ["cypress", "run"]
CMD ["--browser", "chrome"]
