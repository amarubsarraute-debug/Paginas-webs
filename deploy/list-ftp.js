const ftp = require("basic-ftp");

async function main() {
    const client = new ftp.Client();
    client.ftp.verbose = false;
    try {
        await client.access({
            host: "147.93.39.62",
            user: "u726588504.Amaru",
            password: "Amarubelline7!",
            port: 21,
            secure: false
        });
        console.log("Conectado con éxito al FTP de Hostinger.");
        console.log("Listando directorio raíz /:");
        const list = await client.list("/");
        list.forEach(item => {
            console.log(`- ${item.name} (${item.type === 2 ? 'Dir' : 'File'})`);
        });

        // Intentar entrar a web si existe
        try {
            console.log("\nListando /web:");
            const webList = await client.list("/web");
            webList.forEach(item => {
                console.log(`- ${item.name} (${item.type === 2 ? 'Dir' : 'File'})`);
            });
        } catch (e) {
            console.log("No existe o no se pudo acceder a /web");
        }

    } catch (err) {
        console.error("Error en FTP:", err);
    } finally {
        client.close();
    }
}

main();
