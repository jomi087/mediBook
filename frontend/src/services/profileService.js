import { assets } from '../assets/assets';

class ProfileService {
  async getProfile() {
    // later you'll replace this with axios/fetch

    return {
      data: {
        name: 'Jomi Joseph',
        image: assets.profile_pic,
        email: 'jomijoseph087@gmail.com',
        phone: '9876543210',
        address: {
          line1: 'Parayakunnil (Jn)',
          line2: 'Moosharikavala',
        },
        gender: 'male',
        dob: '1999-03-27',
      },
    };
  }
}

export default new ProfileService();
