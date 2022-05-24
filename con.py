from sqlalchemy import create_engine

engine = create_engine('postgresql+psycopg2://postgres:nG7?gK]\gHs~S=.h@protohub-db.cykffb3jfunm.us-west-1.rds.amazonaws.com/blog')
#engine = create_engine('hana://SYSTEM:Password1@10.10.80.100:39015/HXE')
with engine.connect() as conn:
    results = conn.execute('select * from users;')
    print(results.fetchall())
