import React from "react";

export const formatSalary = (salary) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
  }).format(salary);
};

export const getExperienceLevel = (level) => {
  switch (level) {
    case 1:
      return "Entry Level";
    case 2:
      return "Intermediate";
    case 3:
      return "Expert";
    default:
      return "Unknown";
  }
};

export const getExperienceLevelDescription = (level) => {
  switch (level) {
    case 1:
      return "early graduates";
    case 2:
      return "have a experience in the fields";
    case 3:
      return "strong knowledge and mastery in the field";
    default:
      return "Unknown";
  }
};

export const calculateTimeElapsed = (createdAt) => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const timeDifference = now - createdDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else {
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  }
};

export const isNewJob = (createdAt) => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const timeDifference = now - createdDate;
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));

  return hours <= 1;
};

export const descriptionFormatter = (desc) => {
  const sentences = desc.split(".");
  try {
    if (sentences.length === 2) {
      return desc;
    } else {
      return sentences.map((sentence, sentenceIndex, array) => (
        <React.Fragment key={sentenceIndex}>
          {sentence.trim()}
          {sentenceIndex !== array.length - 1 && (
            <>
              .<br />
              <br />
            </>
          )}
        </React.Fragment>
      ));
    }
  } catch (error) {
    return desc;
  }
};

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const convertToTitleCase = (str) => {
  if (!str) {
    return "";
  }

  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase().concat(word.substr(1));
    })
    .join(" ");
};
