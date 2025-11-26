// src/core_engine/optimizer.cpp
// Demostración de C++ para cálculos pesados en backend
#include <vector>
#include <algorithm>

// Función de alto rendimiento para procesar grandes volúmenes de datos
// O(n log n) optimizado para memoria
std::vector<double> process_high_load_data(std::vector<double>& data) {
    // Simulación de lógica compleja de ingeniería
    std::sort(data.begin(), data.end());
    for(auto& val : data) {
        val = val * 1.05; // Transformación vectorizada
    }
    return data;
}
