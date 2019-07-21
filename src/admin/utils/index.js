import axios from "axios";

export function globalCommit(commit, mutationName, params=null) {
  commit(mutationName, params, {root:true} )
}

export function withLock(commit, callApi, callbackResolve=null, callbackRejected = null) {
  globalCommit(commit, 'LOCK_ON');
  return callApi
    .then(res => {
      callbackResolve && callbackResolve(res);
    })
    .catch(error => {
      globalCommit(commit, 'SHOW_START', {
        type: 'danger',
        message: "Ошибка"
      });
      callbackRejected && callbackRejected(error)
    })
    .finally(() => {
      globalCommit(commit, 'LOCK_OFF');
    })
}

export function tooltipShow(commit, type, message) {
  globalCommit(commit, 'SHOW_START', {
    type: type,
    message: message
  });
}
