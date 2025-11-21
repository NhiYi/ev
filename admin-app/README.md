# Admin App (React + Vite)

## Quick start
1. Copy files into `admin-app/`.
2. Create `.env` from `.env.example` and set `VITE_API_BASE_URL` to your gateway.
3. Install deps:
   npm install
4. Start dev server:
   npm run dev

Notes:
- API calls use axios client at src/utils/axiosClient.js which forwards Authorization header from localStorage key 'admin_user'.
- Replace logo: currently points to local path /mnt/data/106d5889-9a3d-4c43-b9e0-2cefddcf78df.png
