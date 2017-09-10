const uuidv4 = require('uuid/v4');

//CREATE USER FACTORY FUNCTION
const createUser = ({name=""} = {}) => (
	{	
		id: uuidv4(),
		name
	}

)

//CREATE MESSAGE FACTORY FUNCTION
const createMessage = ({message="", sender=""} = { }) => (
	{	
		id: uuidv4(),
		time: getTime(new Date(Date.now())),
		message,
		sender
	}
) 

const getTime = (date) => {
  return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`
}

//CREATE CHAT FACTORY FUNCTION
const createChat = ({messages=[], name="Community", users=[]} = {}) => (
	{	
		id: uuidv4(),
		name,
		messages,
		users,
		typingUsers: []
	}
)

module.exports  = {
	createMessage,
	createChat,
	createUser
}