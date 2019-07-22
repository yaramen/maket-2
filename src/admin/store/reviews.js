import {tooltipShow, withLock} from "../utils";
import ServiceReview from "../service/review";

export default {
  namespaced: true,
  state: {
    reviews: [],
  },
  mutations: {
    SET_REVIEW: (state, reviews) => {
      state.reviews = reviews;
    },
    ADD_REVIEW: (state, review) => {
      state.reviews = [...state.reviews, review];
    },
    REMOVE_REVIEW: (state, reviewId) => {
      state.reviews = state.reviews.filter(review => review.id !== reviewId);
    },
    UPDATE_REVIEW: (state, review) => {
      state.reviews = state.reviews.map(currReview => {
        if(currReview.id === review.id) {
          return review
        }
        return currReview;
      });
    }
  },
  actions: {
    getAllReviews({commit}) {
      withLock(commit, ServiceReview.getAll(), response => {
            commit('SET_REVIEW', response.data);
      });
    },
    addNewReview({commit}, review) {
      withLock(commit, ServiceReview.add(review), response => {
        commit('ADD_REVIEW', response.data);
      });
    },
    removeReview({commit}, reviewId) {
      withLock(commit, ServiceReview.remove(reviewId), response => {
        commit('REMOVE_REVIEW', reviewId);
      });
    },
    updateReview({commit}, data) {
      withLock(commit, ServiceReview.update(data), response => {
        commit('UPDATE_REVIEW', response.data.review);
      });
    }
  }
}
