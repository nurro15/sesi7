const { describe, it } = require("mocha");
const assert = require("assert");
const { expect } = require("chai");

let token;

describe("Test Login", function () {

  // 1. Valid Login 
  it("Valid Login", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/login",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: "admin",
          password: "admin",
        }),
      }
    );

    // assert.strictEqual(response.status, 200);
    expect(response.status).to.equal(200);

    // Mencetak Response Body
    const data = await response.json();
    // console.log(data);
    expect(data.message).to.eql("Login successful");

    // Simpan Token
    token = data.token;
    // console.log(token);
  });

  // 2. User
  it("Get User", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/users",
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    // assert.strictEqual(response.status, 200);
    expect(response.status).to.equal(200);

    // Mencetak Response Body
    const data = await response.json();
    // console.log(data);
    expect(data.users).to.be.an("array");
  });

  // 3. Add User - Positive Case
  it("Post Add User - Positive Case", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/add-user",
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          username: `qa_user_${Date.now()}`,
          age: 25,
        }),
      }
    );

    // assert.strictEqual(response.status, 201);
    expect(response.status).to.equal(201);

    // Mencetak Response Body
    const data = await response.json();
    // console.log(data);
    expect(data).to.have.property("userId");
  });

  // 4. Add User - - Negative Case
  it("Post Add User - Negative Case", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/add-user",
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({}),
      }
    );

    // assert.strictEqual(response.status, 400);
    expect(response.status).to.equal(400);

    // Mencetak Response Body
    const data = await response.json();
    // console.log(data);
    expect(data.error).to.eql("Missing username or age");
  });
});
