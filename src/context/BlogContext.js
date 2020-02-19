import React, { useReducer } from "react";
import createDataContext from "./createDataContext";
import jsonServer from "../api/JsonServer";
import JsonServer from "../api/JsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      return action.payload;

    case "add_blogpost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 9999),
          title: action.payload.title,
          content: action.payload.content
        }
      ];
    case "delete_blogpost":
      return state.filter(blogPost => blogPost.id !== action.payload);

    case "edit_blogpost":
      return state.map(blogPost => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    default:
      return state;
  }
};

const getBlogPosts = dispatch => {
  return async () => {
    try {
      const response = await jsonServer.get("/blogposts");
      dispatch({ type: "get_blogposts", payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };
};

const addBlogPost = dispatch => {
  return async (title, content, callback) => {
    try {
      const response = await jsonServer.post("/blogposts", { title, content });
      // dispatch({ type: "add_blogpost", payload: response.data });
      if (callback) {
        callback();
      }
    } catch (e) {
      console.log(e);
    }
  };
};

const deleteBlogPost = dispatch => {
  //return id => {
  //  dispatch({ type: "delete_blogpost", payload: id });
  return async id => {
    try {
      const response = await jsonServer.delete(`/blogposts/${id}`);
      dispatch({ type: "delete_blogpost", payload: id });
    } catch (e) {
      console.log(e);
    }
  };
};

const editBlogPost = dispatch => {
  return async (id, title, content, callback) => {
    try {
      const response = await JsonServer.put(`/blogposts/${id}`, {
        title,
        content
      });
      dispatch({
        type: "edit_blogpost",
        payload: { id: id, title: title, content: content }
      });
      if (callback) {
        callback();
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
