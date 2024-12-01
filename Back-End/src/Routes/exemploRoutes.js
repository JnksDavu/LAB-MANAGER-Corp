import express from "express";
import { listarPosts } from "../Controller/exemploController.js";

const routes = (app) => {
    app.use(express.json());
    app.get("/get", listarPosts);
};

export default routes;