# test-auth-reg
 
Регистрация юзера

/api/auth/register POST
{
 "name":"name",
 "email":"email",
 "password":"password"
}

ответ
{
 "auth": true,
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjE3MDk3NzY1LCJleHAiOjE2MTcwOTk1NjV9.bWCUsAcNxHaEogB2_kuVrha8L5GmK2CRxEsAogyKs7I",
 "user": {
  "id": 2,
  "name": "test",
  "email": "email",
  "password": "$2a$08$3BRhWkQYYYENm2.Pv/scduTQmRZgLQMoPby6bnB9I6hX91txVcypG"
 }
}

/api/auth/login POST
{
 "email":"email",
 "password":"password"
}

ответ
{
 "auth": true,
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjE3MDk3NzY1LCJleHAiOjE2MTcwOTk1NjV9.bWCUsAcNxHaEogB2_kuVrha8L5GmK2CRxEsAogyKs7I",
 "user": {
  "id": 2,
  "name": "test",
  "email": "email",
  "password": "$2a$08$3BRhWkQYYYENm2.Pv/scduTQmRZgLQMoPby6bnB9I6hX91txVcypG"
 }
}

