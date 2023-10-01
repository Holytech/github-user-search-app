import { useState } from "react";
import "./App.css";
import { FaMoon, FaSearch, FaTwitter } from "react-icons/fa";
import { FaLocationDot, FaLink } from "react-icons/fa6";
import { FiSun } from "react-icons/fi";
import { GoOrganization } from "react-icons/go";

function App() {
  const [isDark, setIsDark] = useState(false);
  const [param, setParam] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const options = { day: "2-digit", month: "long", year: "numeric" };

  const getDate = (createDate) => {
    var newDate = new Date(createDate);
    const formattedDate = newDate.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  const getData = () => {
    setIsLoading(true);
    fetch(`https://api.github.com/users/${param}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsLoading(false);
          setError(err.message);
        }
      });

    setParam("");
  };

  return (
    <>
      <div
        className={`w-[100%] h-[100%] flex justify-center items-center lg:p-0 md:p-0 p-8 ${
          isDark ? "bg-[#141D2F]" : "bg-[#F6F8FF]"
        }  font-mono`}
      >
        <div className="lg:w-1/2 w-3/4">
          <div className="flex items-center justify-between">
            <p
              className={`devfinder text-4xl font-bold ${
                isDark ? "text-[#FFF]" : "text-[#222731]"
              }`}
            >
              devfinder
            </p>
            {isDark ? (
              <p
                className="flex gap-1 items-center justify-center text-white cursor-pointer"
                onClick={() => setIsDark(!isDark)}
              >
                Light
                <FiSun />
              </p>
            ) : (
              <p
                className="flex gap-1 items-center justify-center text-[#697C9A] cursor-pointer"
                onClick={() => setIsDark(!isDark)}
              >
                Dark
                <FaMoon />
              </p>
            )}
          </div>
          <div
            className={`my-8 w-full flex gap-2 items-center rounded-lg p-2 shadow-lg ${
              isDark ? "bg-[#1E2A47]" : "bg-[#FEFEFE]"
            }`}
          >
            <FaSearch className="text-[#0079FF] text-4xl" />
            <input
              type="text"
              className={`appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none text-xl ${
                isDark
                  ? "text-[#FFF] placeholder:text-[#FFF]"
                  : "text-[#4B6A9B] placeholder:text-[#4B6A9B]"
              }`}
              placeholder="Search GitHub username…"
              aria-label="Search GitHub username…"
              value={param}
              onChange={(e) => setParam(e.target.value)}
              // disabled={isLoading}
            />
            <button
              className="flex-shrink-0 rounded-xl bg-[#0079FF] text-lg text-white py-2 px-4"
              type="submit"
              onClick={() => getData()}
            >
              Search
            </button>
          </div>
          <div
            className={`w-full rounded-xl lg:p-8 md:p-8 p-4 shadow-lg ${
              isDark ? "bg-[#1E2A47]" : "bg-[#FEFEFE]"
            }`}
          >
            <div className="w-full flex gap-2">
              <div className="w-[30%] lg:w-[18%] md:w-[18%]">
                <img
                  src={data ? data.avatar_url : "/octocat.png"}
                  alt="octocat"
                  className={`rounded-full`}
                />
              </div>
              <div className="w-[80%]">
                <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center w-full">
                  <p
                    className={`lg:text-4xl md:text-2xl font-bold text-lg ${
                      isDark ? "text-[#FFF]" : "text-[#2B3442]"
                    }`}
                  >
                    {data ? data.name : "The Octocat"}
                  </p>
                  <p
                    className={`lg:text-xl md:text-xl text-xs ${
                      isDark ? "text-[#FFF]" : "text-[#697C9A]"
                    }`}
                  >
                    Joined {data ? getDate(data.created_at) : " 25 Jan 2011"}
                  </p>
                </div>
                <p className="text-[#0079FF] lg:text-xl md:text-xl text-sm mt-2">
                  @{data ? data.login : "octocat"}
                </p>
                <p
                  className={`lg:text-xl md:text-xl text-sm mt-3 hidden lg:inline ${
                    isDark ? "text-[#FFF]" : "text-[#4B6A9B]"
                  }`}
                >
                  {data ? data.bio : "This profile has no bio"}
                </p>
              </div>
            </div>
            <div
              className={`w-full mt-3 lg:text-xl md:text-xl text-sm lg:hidden ${
                isDark ? "text-[#FFF]" : "text-[#4B6A9B]"
              }`}
            >
              {data ? data.bio : "This profile has no bio"}
            </div>
            <div className="w-full flex gap-2">
              <div className="h-[100%] w-[18%] hidden lg:inline">{""}</div>
              <div className="w-full lg:w-[80%]">
                <div
                  className={`w-full rounded-lg my-8 p-8 flex md:flex-row lg:flex-row flex-col gap-y-4 justify-between ${
                    isDark ? "bg-[#141D2F]" : "bg-[#F6F8FF]"
                  }`}
                >
                  <div>
                    <p
                      className={`text-xl ${
                        isDark ? "text-[#FFF]" : "text-[#4B6A9B]"
                      }`}
                    >
                      Repos
                    </p>
                    <p
                      className={`text-2xl font-bold ${
                        isDark ? "text-[#FFF]" : "text-[#2B3442]"
                      }`}
                    >
                      {data ? data.public_repos : "8"}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-xl ${
                        isDark ? "text-[#FFF]" : "text-[#4B6A9B]"
                      }`}
                    >
                      Followers
                    </p>
                    <p
                      className={`text-2xl font-bold ${
                        isDark ? "text-[#FFF]" : "text-[#2B3442]"
                      }`}
                    >
                      {data ? data.followers : "3938"}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-xl ${
                        isDark ? "text-[#FFF]" : "text-[#4B6A9B]"
                      }`}
                    >
                      Following
                    </p>
                    <p
                      className={`text-2xl font-bold ${
                        isDark ? "text-[#FFF]" : "text-[#2B3442]"
                      }`}
                    >
                      {data ? data.following : "9"}
                    </p>
                  </div>
                </div>
                <div
                  className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 text-sm lg:text-lg md:text-lg gap-y-4 ${
                    isDark ? "text-[#FFF]" : "text-[#4B6A9B]"
                  }`}
                >
                  <div className="flex gap-3 items-center">
                    <FaLocationDot />
                    <p>{data ? data.location : "San Francisco"}</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <FaTwitter />
                    <p>
                      {data
                        ? data.twitter_username == null
                          ? "Not Available"
                          : data.twitter_username
                        : "Not Available"}
                    </p>
                  </div>
                  <div className="flex gap-3 items-center truncate">
                    <FaLink />
                    <p>
                      <a href={data ? data.html_url : "#"}>
                        {data ? data.html_url : "https://github.blog"}
                      </a>
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <GoOrganization />
                    <p>
                      @
                      {data
                        ? data.company == null
                          ? "Not Available"
                          : data.company
                        : "github"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
