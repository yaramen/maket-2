import ServiceUser from "../service/user";

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
      console.log(error.response.data);

      if(error.response && error.response.data && error.response.data.error &&
        (error.response.data.error === "token_not_provided" ||error.response.data.error === "token_invalid")) {
        callbackRejected && callbackRejected(error);
        return;
      }

      let message = 'Ошибка';
      let type = 'danger';

      if(error.response && error.response.data) {
        if(error.response.data.message) {
          message = error.response.data.message;
        }
        if(error.response.data.errors) {
          message = Object.values(error.response.data.errors).join('<br>')
        }
        if(error.response.data.error) {
          message = error.response.data.error;
        }
      }

      tooltipShow(commit, type, message);
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
