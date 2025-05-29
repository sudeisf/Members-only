import { create } from "zustand";
import axios from "axios";
import socket from "../services/sharedSocket"; // Use shared socket

export const usePostStore = create((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,
  postMessage: "",

  setPostMessage: (message) => set({ postMessage: message }),

  clearPostMessage: () => set({ postMessage: "" }),

  fetchPosts: async (clubId) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/${clubId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const posts = response.data.result.map((post) => ({
        id: post.id,
        message_content: post.message_content || post.content,
        user_id: post.user_id,
        club_id: Number(post.club_id),
        sent_at: post.sent_at || post.created_at,
        firstname: post.firstname,
        lastname: post.lastname,
        email: post.email,
        club_name: post.club_name,
      })) || [];
      set({ posts, isLoading: false });
    } catch (err) {
      console.error("Error fetching posts:", err);
      set({ isLoading: false, error: err.message || "Failed to fetch posts" });
    }
  },

  addPost: async (clubId, content) => {
    if (!content.trim()) {
      alert("Post message cannot be empty!");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/post/${clubId}`,
        { content},
        { withCredentials: true }
      );
      if (response.data.success) {
        const newPost = {
          id: response.data.post.id,
          message_content: response.data.post.message_content || response.data.post.content,
          user_id: response.data.post.user_id,
          club_id: Number(response.data.post.club_id), // Ensure number
          sent_at: response.data.post.sent_at || response.data.post.created_at,
          firstname: response.data.post.firstname,
          lastname: response.data.post.lastname,
          email: response.data.post.email,
          club_name: response.data.post.club_name,
        };
        set((state) => ({
          posts: [newPost, ...state.posts],
          postMessage: "",
        }));
      }
    } catch (err) {
      console.error("Error creating post:", err);
      set({ error: err.message || "Failed to create post" });
    }
  },

  initializeSocket: () => {
    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("new_post", (newPost) => {
      console.log("Received new post via socket:", newPost);
      const normalizedPost = {
        id: newPost.id,
        message_content: newPost.message_content || newPost.content,
        user_id: newPost.user_id,
        club_id: newPost.club_id, 
        sent_at: newPost.sent_at,
        firstname: newPost.firstname,
        lastname: newPost.lastname,
        email: newPost.email,
        club_name: newPost.club_name,
      };
      set((state) => ({
        posts: [normalizedPost, ...state.posts],
      }));
    });

    socket.on("connect_error", (error) => {
      console.error("Socket.IO connection error:", error);
    });

    return () => {
      socket.off("connect");
      socket.off("new_post");
      socket.off("connect_error");
    };
  },
}));