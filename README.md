# geojson_translate

Simple command to translate files in Esri ASCII format to GeoJSON

## Downloads

---

You can find the executables for Windows, macOS and Linux [here](https://github.com/vicenteCancioCanas/geojson_translate/tree/master/distribution)

Instructions not available for Linux yet

## Setup

1. Download the `geojson-translate-*` tool executable here for the platform you are using
2. Save the executable wherever you want and save its path

### Windows

---

3. Follow the instructions [here](https://docs.alfresco.com/4.2/tasks/fot-addpath.html) using the path you saved on the previous instruction

### macOS

---

3.  Open ~/.zshrc or ~/.bash_profile and run the following command

        export PATH=$PATH:<path_to_geojson-translate-macos>

## Usage

### Windows

---

    geojson-translate-win.exe path_to_etype.asc path_to_IQD.asc geojson_name

### macOS

---

    geojson-translate-macos path_to_etype.asc path_to_IQD.asc geojson_name
