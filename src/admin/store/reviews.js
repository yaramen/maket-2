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
      const userId = localStorage.getItem('userId');
      withLock(commit, ServiceReview.getAll(userId), response => {
            commit('SET_REVIEW', response.data);
      });
    },
    addNewReview({commit}, review) {
      withLock(commit, ServiceReview.add(review), response => {
        commit('ADD_REVIEW', response.data);
        tooltipShow(commit, 'success', 'Запись добавлена');
      });
    },
    removeReview({commit}, reviewId) {
      withLock(commit, ServiceReview.remove(reviewId), response => {
        commit('REMOVE_REVIEW', reviewId);
        tooltipShow(commit, 'success', 'Запись удалена');
      });
    },
    updateReview({commit}, data) {
      withLock(commit, ServiceReview.update(data), response => {
        commit('UPDATE_REVIEW', response.data.review);
        tooltipShow(commit, 'success', 'Запись обновлена');
      });
    }
  }
}
