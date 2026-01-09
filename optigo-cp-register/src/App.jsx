import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("");
  const [phone, setPhone] = useState("");

  const [showResult, setShowResult] = useState(false);
  const [phase, setPhase] = useState("idle");
  const [passedCount, setPassedCount] = useState(0);
  const [activeTab, setActiveTab] = useState("statement");
  const [language, setLanguage] = useState("cpp");

  const totalTests = 5;

  const handleRegister = async () => {
  // basic frontend validation
  if (!college || !name || !branch || !phone || !email) {
    alert("All fields are required");
    return;
  }

  try {
    const response = await fetch("https://optigo-registration2k26.vercel.app/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        college,
        name,
        branch,
        phone,
        email,
      }),
    });

    const data = await response.json();

    
    if (!response.ok) {
      alert(data.error || "Registration failed");
      return;
    }

   
    setShowResult(true);
    setPhase("compiling");
    setPassedCount(0);

    setTimeout(() => setPhase("testing"), 1200);
    setTimeout(() => setPhase("results"), 2500);

  } catch (err) {
    alert("Server not reachable");
    console.error(err);
  }
};


  useEffect(() => {
    if (phase === "results" && passedCount < totalTests) {
      const timer = setTimeout(() => {
        setPassedCount((prev) => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase, passedCount]);

  const codeTemplates = {
    cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string name = "${name || "..."}";
    string email = "${email || "..."}";
    

    cout << "Correct Answer";
    return 0;
}`,
    python: `def main():
    name = "${name || "..."}"
    email = "${email || "..."}"
    

    print("Correct Answer")

if __name__ == "__main__":
    main()`,
    java: `public class Main {
    public static void main(String[] args) {
        String name = "${name || "..."}";
        String email = "${email || "..."}";
        

        System.out.println("Correct Answer");
    }
}`,
    js: `function main() {
  const name = "${name || "..."}";
  const email = "${email || "..."}";
  

  console.log("Correct Answer");
}

main();`
  };

  return (
    <div className="app-wrapper">
      <div className="topbar">
        <div className="top-left">
          <span className="difficulty">Difficulty: 1500</span>
        </div>

        <div className="top-tabs">
          <button
            className={`tab ${activeTab === "statement" ? "active" : ""}`}
            onClick={() => setActiveTab("statement")}
          >
            Statement
          </button>

          <button
            className={`tab ${activeTab === "submissions" ? "active" : ""}`}
            onClick={() => setActiveTab("submissions")}
          >
            Submissions
          </button>

          <button
            className={`tab ${activeTab === "result" ? "active" : ""}`}
            onClick={() => setActiveTab("result")}
          >
            Result
          </button>

          <button
            className={`tab ${activeTab === "help" ? "active" : ""}`}
            onClick={() => setActiveTab("help")}
          >
            Help
          </button>
        </div>

        <div className="top-right">
          <select
            className="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="js">JavaScript</option>
          </select>

          <button className="theme-toggle">☀️</button>
        </div>
      </div>

      <div className="container">
        {/* FORM */}
        <div className="form-section">
          {activeTab === "statement" && (
            <div className="statement">
              <h2>OPTIGO CP REGISTRATION</h2>

              <p>
                You are required to register for the Optigo Competitive Programming
                contest. Fill in the details below carefully.
              </p>

              <h3>Registration Details</h3>

              <div className="statement-form">
                <label>Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                />

                <label>Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                <label>College</label>
                <input
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="Enter your college name"
                />

                <label>Branch</label>
                <input
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  placeholder="CSE / IT / ECE"
                />

                <label>Phone Number</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10 digit mobile number"
                />

                

                <button onClick={handleRegister}>Register</button>
              </div>

              <h3>Notes</h3>
              <ul>
                <li>Multiple registrations are not allowed.</li>
                <li>Make sure your handle is correct.</li>
                <li>Language can be changed from the editor.</li>
              </ul>
            </div>
          )}
        </div>

        {/* CODE */}
        <div className="code-section">
          <div className="editor-header">
            <span className="file-name">
              {language === "cpp" && "Main.cpp"}
              {language === "python" && "main.py"}
              {language === "java" && "Main.java"}
              {language === "js" && "main.js"}
            </span>
          </div>

          <div className="code-area">
            <pre>{codeTemplates[language]}</pre>
          </div>
        </div>
      </div>

      {/* RESULT OVERLAY */}
      {showResult && (
        <div className="overlay">
          <div className="result-card">
            <div className="result-header">
              <span>✔ Correct Answer</span>
              <span>Submission ID: 1223980450</span>
            </div>

            {phase !== "results" && (
              <div className="loading">
                {phase === "compiling" && "Compiling..."}
                {phase === "testing" && "Running test cases..."}
              </div>
            )}

            {phase === "results" && (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>Subtask</th>
                      <th>Test</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <tr key={i} className={i < passedCount ? "passed" : ""}>
                        <td>1</td>
                        <td>{i}</td>
                        <td>
                          {i < passedCount ? "Correct (0.00)" : "Running..."}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="footer">
                  <span>
                    Subtask Score:{" "}
                    {passedCount === totalTests ? "100%" : "—"}
                  </span>
                  <span>
                    Result:{" "}
                    {passedCount === totalTests ? "Correct" : "Running"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}