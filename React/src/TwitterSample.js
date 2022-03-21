import { useState, useEffect } from "react";
import axios from "axios";

const TwitterSample = () => {
  let [tweet, setTweet] = useState([
    {
      title: "initial tweeet",
      tweetBody: "body of tweet",
      doc: "",
      author: "",
      category: "music",
    },
  ]);
  useEffect(() => {
    getTweet();
  }, []);
  const getTweet = () => {
    axios
      .get("/tweet")
      .then((res) => {
        setTweet(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let addTweet = (event) => {
    event.preventDefault();
    let tweetObject = {
      title: event.target.inputTitle.value,
      tweetBody: event.target.inputBody.value,
      doc: event.target.inputdoc.value,
      author: event.target.inputAuthor.value,
      category: event.target.inputCategory.value,
    };
    console.log(tweetObject);
    axios
      .post("/tweet", tweetObject)
      .then((res) => {
        getTweet();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let deleteTodo = (indexToDelete) => {
    axios
      .delete("/tweet/" + indexToDelete)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getTweet();
  };
  const deleteAll = () => {
    axios
      .put("/tweet/deleteAll")
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getTweet();
  };
  return (
    <div className='container'>
      <h2>Tweet</h2>
      <form onSubmit={addTweet}>
        <label>Tweet Titile</label>
        <br />
        <input type='text' name='inputTitle' placeholder='Tweet Title' />
        <br />
        <label>Date of Creation</label>
        <br />
        <input type='date' name='inputdoc' />
        <br />
        <label>Tweet Author</label>
        <br />
        <input type='text' name='inputAuthor' placeholder='Author' />
        <br />
        <label>Tweet Category</label>
        <br />
        <select name='inputCategory'>
          <option value='entertainment'>Entertainment</option>
          <option value='study'>Study</option>
          <option value='politics'>Politics</option>
          <option value='sports'>Sports</option>
        </select>
        <br />
        <label>Tweet Description</label>
        <br />
        <textarea
          name='inputBody'
          placeholder='Body of the Tweet'
          rows='8'
        ></textarea>
        <br />
        <div className='aligncenter'>
          <button>Add Tweet</button>
        </div>
      </form>
      <div className='deleteBtn'>
        <button onClick={deleteAll}>Delete All</button>
      </div>
      {tweet.map(function (val, index) {
        return (
          <div className='tweets'>
            <p>
              <b>Title: </b>
              {val.title}
            </p>
            <p>
              <b>Tweet Body:</b> {val.tweetBody}
            </p>
            <p>
              <b>Date of Creation:</b> {val.doc}
            </p>
            <p>
              <b>Author:</b> {val.author}
            </p>
            <p>
              {" "}
              <b>Category:</b> {val.category}
            </p>
            <div className='aligncenter'>
              <button
                onClick={() => {
                  deleteTodo(index);
                }}
              >
                {" "}
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default TwitterSample;
