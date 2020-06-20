import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import AuthService from "../../Services/AuthService";

const StarRating = (props) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      setIsAuthenticated(data.isAuthenticated);
    });
  }, []);

  const calculateAvgRate = () => {
    let noOfUsers = props.RatingList.length;
    let total = 0;
    let average = 0;

    props.RatingList.map((rating, index) => {
      total = total + rating.rating;
    });

    average = total / noOfUsers;
    return average.toFixed(1);
  };

  const onSubmit = () => {
    const variables = {
      rating: rating,
      productID: props.postID,
    };

    axios.post("/rating/saveRating", variables).then((response) => {
      if (response.data.success) {
        // props.refreshFunction(response.data.result);
      } else {
        alert("Failed to submit feedback");
      }
    });
  };

  return (
    <div>
      {isAuthenticated === true ? (
        <div>
          {/*{console.log(props.RatingList)}*/}

          <h4 className="font-weight-bold">
            Average Rate {calculateAvgRate()}
          </h4>

          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <label>
                <input
                  type="radio"
                  name="rating"
                  style={{ display: "none" }}
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />
                <FaStar
                  size={33}
                  style={{ cursor: "pointer" }}
                  color={
                    ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>
      ) : (
        <div>
          {console.log(props.RatingList)}
          <h4>{calculateAvgRate()}</h4>
        </div>
      )}

      {rating > 0 ? (
        <p className="text-success">We value your feedback. Thank you!</p>
      ) : (
        ""
      )}

      {rating > 0 ? onSubmit() : ""}
    </div>
  );
};

export default StarRating;
