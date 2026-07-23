import AccountModel from "../model/accountModel.js";


export class AuthRepository {
  #mapAccount(account) {
    return {
      id: account._id.toString(),
      name: account.name,
      email: account.email,
      image: account.image,
      address: account.address,
      gender: account.gender,
      dob: account.dob,
      phone: account.phone,
      role: account.role,
    };
  }

  async isRegisterByEmail(email) {
    const account = await AccountModel.findOne({ email })
    return !!account;
  }

  async registerAccount(payload) {
    let account = await AccountModel.create(payload);
    return this.#mapAccount(account)
  }

  async fetchAccountByEmail(email) {
    // password select is false (by default)
    const account = await AccountModel.findOne({ email }).select('+password')
    if (!account) return null;
    return { password: account.password, ...this.#mapAccount(account) };
  }

  async fetchAccountById(id) {
    // password select is false (by default)
    const account = await AccountModel.findById(id)
    if (!account) return null;
    return this.#mapAccount(account);
  }


}