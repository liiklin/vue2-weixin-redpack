export const getNick = (status, userName) => {
  if (status == '1001' || status == '1002') {
    return `幸运的 ${userName}，`
  }
  return `亲爱的 ${userName}，`
}
