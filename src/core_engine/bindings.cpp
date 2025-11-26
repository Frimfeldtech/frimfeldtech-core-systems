#include <pybind11/pybind11.h>
#include <pybind11/stl.h>
#include "optimizer.cpp"

namespace py = pybind11;

PYBIND11_MODULE(core_engine, m) {
    m.doc() = "High-performance C++ core engine for FrimfeldTech systems";
    m.def("process_high_load_data", &process_high_load_data, "A function to process high load data efficiently");
}
