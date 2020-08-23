import { Auth } from 'aws-amplify'
async function checkUser(updateUser) {
  const userData = await Auth
    .currentSession()
    .catch(err => console.log('error: ', err)
  )
  if (!userData) {
    console.log('userData: ', userData)
    updateUser()
    return
  }
  const { idToken: { payload }} = userData
  const isAuthorized =
    payload['cognito:groups'] &&
  payload['cognito:groups'].includes('Admin')
  console.log('payload', payload)
  console.log('isAuthorized', isAuthorized)
  updateUser({
    username: payload['cognito:username'],
    userID: payload['cognito:username'],
    isAdmin: isAuthorized
  })
}
export default checkUser