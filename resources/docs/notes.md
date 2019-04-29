# Algorithms

- Sending Verification Algorithm
  - Enter cellphone number
    - Validate cellphone number
  - Generate validation code
    - Save in database (Repositories with providers ie. MemoryProvider, MongoDbProvider)
  - Send validation code
    - A sender stack that register senders
    - Catch sms error send
    - Catch console error send 
    - 

- Verification process
  - Receive validation code
  - Validate if exist
  - Return 

- Get revs process (Not necessary)
  - Ask for revs
  - Check if the account is verified
  - Return revs dummy with rest functionality
    - Filter revs
    - Paginate revs

# Entities

- User
  - id
  - phone
  - validationCode