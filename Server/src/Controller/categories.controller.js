const { Category } = require("../db");

//Obtiene todas las categorias
const getAllCategories = async () => {
  try {
    const categories = await Category.findAll();
    return categories;
  } catch (error) {
    throw new Error(
      "Error al obtener categorías desde la base de datos: " + error.message
    );
  }
};

//Crea una categoria y la guarda en la base de datos
const postCategory = async (name) => {
  try {
    const newCategory = await Category.create({ name });
    return newCategory;
  } catch (error) {
    throw new Error(
      "Error al agregar categoría a la base de datos: " + error.message
    );
  }
};

//Obtiene una categoria por id
const getCategoryById = async (id) => {
  try {
    const category = await Category.findByPk(id);

    // Verificar si se encontró la categoría
    if (!category) {
      return "categoría no encontrada";
    }

    // Enviar la categoría como respuesta
    return category;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Obtener una categoría por su nombre
const getCategoryByName = async (name) => {
  const categoryName = name; // Obtén el nombre de los parámetros de la solicitud

  try {
    const category = await Category.findOne({
      where: { name: categoryName },
    });

    // Verificar si se encontró la categoría
    if (!category) {
      return "categoría no encontrada";
    }

    // Enviar la categoría como respuesta
    return category;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Update category
const updateCategory = async (id, updatedCategoryData) => {
  try {
    const existingCategory = await Category.findByPk(id);
    if (!existingCategory) {
      return false;
    }
    await existingCategory.update(updatedCategoryData);

    return true;
  } catch (error) {
    throw error;
  }
};

const deleteCategoryById = async (id) => {
  try {
    const category = await Category.findByPk(id);

    if (!category) {
      throw new Error("Categoría no encontrada");
    }

    await category.destroy();

    return category;
  } catch (error) {
    throw new Error("Error al eliminar la categoría por ID: " + error.message);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  postCategory,
  updateCategory,
  deleteCategoryById,
};
