const TweetSchema = require('./../../models/Tweet');


//Test Message Tweet
const testTweet = () => {
    return {
        message: "Hello tweet"
    }
}

const asyncCreateTweets =  async ({ tweet }, { user }) => {

    const { id } = user;
    
    console.log(tweet);
    
    try {

        const newTweet = new TweetSchema({
            user: id,
            tweet: tweet,
        });

        const saveTweet =  await newTweet.save();

        return {
            code: 2001,
            message: "Has creado un Tweet",
            status: true,
            error: null
        };

    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    testTweet,
    asyncCreateTweets
}