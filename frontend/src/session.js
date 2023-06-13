export function getSessionId() {
    const sessionId = document.cookie
      .split('; ')
      .find(row => row.startsWith('connect.sid='))
      .split('=')[1];
    return sessionId;
  }