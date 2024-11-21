import React from "react";
import { Modal, Form } from "react-bootstrap";

const RecipeModal = ({ show, onClose, onSubmit, recipe, setRecipe, isEditing }) => {
  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? "Edit Recipe" : "Add Recipe"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control type="text" name="name" value={recipe.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ingredients</Form.Label>
            <Form.Control type="text" name="ingredients" value={recipe.ingredients} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Instructions</Form.Label>
            <Form.Control type="text" name="instructions" value={recipe.instructions} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cuisine</Form.Label>
            <Form.Control type="text" name="cuisine" value={recipe.cuisine} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <Form.Control type="text" name="tags" value={recipe.tags} onChange={handleChange} required
            />
          </Form.Group>
          <button className="btn btn-primary" type="submit">
            {isEditing ? "Update Recipe" : "Add Recipe"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RecipeModal;
