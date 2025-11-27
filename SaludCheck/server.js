const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer'); // Para subida de archivos Excel
const xlsx = require('xlsx');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// --- MOCK DATABASE (En memoria para prototipo) ---
const users = [];
const prospects = [];
const queryLogs = [];

// --- BUSINESS LOGIC (Semáforo) ---
const calculateTrafficLight = (data) => {
    // Lógica simulada basada en reglas de negocio
    // En producción, esto analizaría fechas reales de 'last_transfer_date' y 'contributions'
    
    const monthsSinceTransfer = data.monthsSinceTransfer || 13; // Default a >12 para demo
    const hasContributions = data.hasContributions !== undefined ? data.hasContributions : true;
    const isMonotributoSocial = data.osType === 'Monotributo Social';

    if (isMonotributoSocial || monthsSinceTransfer < 11 || !data.isActive) {
        return { color: 'RED', message: 'No apto para traspaso inmediato.' };
    }
    if (monthsSinceTransfer === 11 || !hasContributions) {
        return { color: 'YELLOW', message: 'Opción de cambio próxima o aportes irregulares.' };
    }
    return { color: 'GREEN', message: 'Cliente ideal. Apto para traspaso.' };
};

// --- MOCK SCRAPER SERVICE ---
const mockScrape = async (cuil, password = null) => {
    // Simula un retardo de red
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generar datos aleatorios pero deterministas basados en el CUIL para demo
    const lastDigit = parseInt(cuil.slice(-1));
    
    let result = {
        cuil,
        firstName: "NombreGenerico",
        lastName: "ApellidoGenerico",
        isActive: true,
        osName: "OSECAC",
        monthsSinceTransfer: 13,
        hasContributions: true
    };

    if (lastDigit < 3) {
        result.monthsSinceTransfer = 5; // ROJO
        result.isActive = true;
    } else if (lastDigit < 6) {
        result.monthsSinceTransfer = 11; // AMARILLO
    } else {
        result.monthsSinceTransfer = 24; // VERDE
    }

    return result;
};

// --- ROUTES ---

// 1. Check Individual
app.post('/api/check', async (req, res) => {
    const { cuil, password } = req.body;
    
    if (!cuil) return res.status(400).json({ error: 'CUIL requerido' });

    try {
        const scraperData = await mockScrape(cuil, password);
        const analysis = calculateTrafficLight(scraperData);

        const responseData = {
            ...scraperData,
            status: analysis
        };

        // Guardar en log (mock)
        queryLogs.push({
            id: uuidv4(),
            cuil,
            result: responseData,
            timestamp: new Date()
        });

        res.json(responseData);
    } catch (error) {
        res.status(500).json({ error: 'Error en el servicio de consulta' });
    }
});

// 2. Carga Masiva (Excel)
const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/upload-batch', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No se subió ningún archivo' });

    try {
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        // Procesar cada fila (Simulado)
        const processedData = await Promise.all(data.map(async (row) => {
            const cuil = row['CUIL'] || row['cuil'];
            if (!cuil) return { ...row, STATUS: 'ERROR', MESSAGE: 'Sin CUIL' };

            const scraperData = await mockScrape(cuil.toString());
            const analysis = calculateTrafficLight(scraperData);

            return {
                ...row,
                STATUS_COLOR: analysis.color,
                OS_ACTUAL: scraperData.osName,
                MENSAJE: analysis.message
            };
        }));

        res.json({ 
            message: 'Procesamiento completado', 
            total: processedData.length,
            data: processedData 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error procesando el archivo' });
    }
});

app.get('/', (req, res) => {
    res.send('SaludCheck API v1.0 Running');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
