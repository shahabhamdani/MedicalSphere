const fs = require('fs');
const path = require('path');
const streamifier = require('streamifier');


//Lists all the registered doctors
//Inputs: - 
//Response: DOC_ID, NAME, REGNO, SPECIALIZATION, LOCATION
const handleGetRegisterDocs = (req, res, db) => {
    // console.log("requested")
    return db.column('DOC_ID', 'NAME', 'REGNO', 'SPECIALIZATION', 'LOCATION')
        .select()
        .from('registerdoctor')
        .orderBy('NAME')
        .then(docs => {
            if (docs.length)
                res.json(docs)
            else
                res.json("NO")
        })
        .catch(err => res.json('error getting docs'))
}


//Get all Blogs

const handleGetBlogs = (req, res, db) => {
    db.select('id', 'title', 'text', 'image', 'date', 'time')
      .from('blogs')
      .then((data) => {
        const blogs = data.map((blog) => {
          if (blog.image) {
            const base64Image = fs.readFileSync(path.join(__dirname, `../uploads/${blog.image}`), { encoding: 'utf8' });
            return {
              id: blog.id,
              title: blog.title,
              text: blog.text,
              image: base64Image,
              date: blog.date,
              time: blog.time,
            };
          } else {
            return {
              id: blog.id,
              title: blog.title,
              text: blog.text,
              image: null,
              date: blog.date,
              time: blog.time,
            };
          }
        });
        res.json(blogs);
      })
      .catch((err) => res.status(400).json('Error getting blogs'));
  };


  
const handleGetSingleBlog = (req, res, db) => {
    db.select('id', 'title', 'text', 'image', 'date', 'time')
      .from('blogs')
      .where({ id: req.params.id })
      .then((data) => {
        const blogs = data.map((blog) => {
          if (blog.image) {
            const base64Image = fs.readFileSync(path.join(__dirname, `../uploads/${blog.image}`), { encoding: 'utf8' });
            return {
              id: blog.id,
              title: blog.title,
              text: blog.text,
              image: base64Image,
              date: blog.date,
              time: blog.time,
            };
          } else {
            return {
              id: blog.id,
              title: blog.title,
              text: blog.text,
              image: null,
              date: blog.date,
              time: blog.time,
            };
          }
        });
        res.json(blogs);
      })
      .catch((err) => res.status(400).json('Error getting blogs'));
  };

//Update a Blog
const handleUpdateBlog = (req, res, db) => {
   

        const { title, text, date, time } = req.body;
        const file = req.body.image;
      
        // Convert the Blob to a stream using streamifier
        const stream = streamifier.createReadStream(file);
      
        // Convert the stream to a buffer
        let buffer = Buffer.from([]);
        stream.on('data', (chunk) => {
          buffer = Buffer.concat([buffer, chunk]);
        });
      
        stream.on('end', () => {
          // Convert the buffer to a base64 string
          const base64Image = buffer.toString('base64');
      
          // Determine the MIME type of the image
          const mimeType = file.type === 'image/jpeg' ? 'jpeg' : 'png';
      
          // Save the base64 string as an image file
          const filename = `${Date.now()}.${mimeType}`;
          const filepath = path.join(__dirname, '../uploads', filename);
          require('fs').writeFile(filepath, base64Image, { encoding: 'base64' }, (err) => {
            if (err) {
              console.log(err);
              return res.status(500).send({ error: 'Error saving file' });
            }
      
            // Save the file path to the database
            return     db('blogs')
            .where({ id: req.params.id })
              .update({
                title: title,
                text: text,
                image: filename,
                date: date,
                time: time,
              })

              .catch((err) => {
                console.log(err);
                return res.status(500).send({ error: 'Error saving to database' });
              })
               .then(numRowsAffected => {
            if (numRowsAffected > 0) {
                res.json({ message: "Blog post updated successfully." });
            } else {
                res.status(404).json({ error: "Blog post not found." });
            }
        })
          });
        });

};



//Delete a Blog
const handleDeleteBlog = (req, res, db) => {
    db('blogs')
        .where({ id: req.params.id })
        .del()
        .catch(err => console.log(err))
        .then(r => res.json(`Removed`))
}


const handleCreateBlog = (req, res, db) => {
    const { title, text, date, time } = req.body;
    const file = req.body.image;
  
    // Convert the Blob to a stream using streamifier
    const stream = streamifier.createReadStream(file);
  
    // Convert the stream to a buffer
    let buffer = Buffer.from([]);
    stream.on('data', (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);
    });
  
    stream.on('end', () => {
      // Convert the buffer to a base64 string
      const base64Image = buffer.toString('base64');
  
      // Determine the MIME type of the image
      const mimeType = file.type === 'image/jpeg' ? 'jpeg' : 'png';
  
      // Save the base64 string as an image file
      const filename = `${Date.now()}.${mimeType}`;
      const filepath = path.join(__dirname, '../uploads', filename);
      require('fs').writeFile(filepath, base64Image, { encoding: 'base64' }, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ error: 'Error saving file' });
        }
  
        // Save the file path to the database
        return db
          .insert({
            title: title,
            text: text,
            image: filename,
            date: date,
            time: time,
          })
          .into('blogs')
          .catch((err) => {
            console.log(err);
            return res.status(500).send({ error: 'Error saving to database' });
          })
          .then((r) => res.json(`Added!`));
      });
    });
  };

const handleGetAllDocs = (req, res, db) => {
    return db.select('DOC_ID', 'NAME', 'REGNO', 'SPECIALIZATION', 'LOCATION')
        .from('registerdoctor')
        .union(function () {
            this.select('DOC_ID', 'NAME', 'REGNO', 'SPECIALIZATION', 'LOCATION')
                .from('validdoctor')
        })
        .orderBy('NAME')
        .then(all => {
            // console.log("all ", all);
            if (all.length)
                res.json(all)
            else
                res.json("NO")
        })

}

const handleGetValidDocs = (req, res, db) => {
    return db.select('*')
        .from('validdoctor')
        .then(valid => {
            // console.log("valid ", valid)
            if (valid.length) {
                res.json(valid);
            } else res.json("NO");
        })
}




//Searching the required doctor
//Input: url query string( location, requirement )
//List of all the matching doctors 
const handleSearchDoc = (req, res, db) => {
    location = req.query.location;
    specialization = req.query.specialization;
    if (!location) location = "_";
    if (!specialization) specialization = "_";
    // console.log(location, specialization);
    db
        .select('*')
        .from('registerdoctor')
        .where('LOCATION', 'like', `%${location}%`).andWhere('SPECIALIZATION', 'like', `%${specialization}%`)
        .then(docs => { res.json(docs) })

}

const handleSearchInAllDocs = (req, res, db) => {
    location = req.query.location;
    specialization = req.query.specialization;
    if (!location) location = "_";
    if (!specialization) specialization = "_";
    // console.log(location, specialization);
    db
        .select('*')
        .from('alldoctors')
        .where('LOCATION', 'like', `%${location}%`).andWhere('SPECIALIZATION', 'like', `%${specialization}%`)
        .then(docs => { res.json(docs) })
}
//Moves the valid doctors to separate table -> validdoctor
//Input: url parameter (id) 
//Response: if successfully moved then responds with "Moved"
const handleValidDoc = (req, res, db) => {
    // console.log(req.params.id)
    db.select('*').from('registerdoctor').where('DOC_ID', '=', req.params.id)
        .then(user => {
            // console.log(user)
            const { DOC_ID, NAME, EMAIL, PHONE_NUMBER, REGNO, SPECIALIZATION, LOCATION, FEE } = user[0];

            return db
                .insert({
                    DOC_ID: DOC_ID,
                    NAME: NAME,
                    EMAIL: EMAIL,
                    PHONE_NUMBER: PHONE_NUMBER,
                    REGNO: REGNO,
                    SPECIALIZATION: SPECIALIZATION,
                    LOCATION: LOCATION,
                    FEE: FEE,
                })
                .into('validdoctor')
                .catch(err => console.log(err))
                .then(id => {
                    // console.log(id);
                    return db('registerdoctor')
                        .where({ DOC_ID })
                        .del()
                        .catch(err => res.json(err.sqlMessaage));
                })
                .catch(err => res.json("Error deleting"))

        })
        .then(flag => res.json('Moved'))
        .catch(e => console.log(e));
}


//Deletes invalid doctor from registerdoctor table
//Input: url parameter (id) 
//Response: if successfully deleted then responds with "Removed"
const handleInvalidDoc = (req, res, db) => {
    const invalidDoc = req.params.id;
    db('registerdoctor')
        .where({ DOC_ID: req.params.id })
        .del()
        .then(r => {
            return db('alldoctors')
                .where({ DOC_ID: req.params.id })
                .del()
        })
        .catch(err => console.log(err))
        .then(r => res.json(`Removed`))


}


//Admin can register new user.
//Input: name, password, specialization, regNo, location
//Response: NAME of the registered person OR if name already exists gives Error
const handleRegisterDoc = (req, res, db) => {
    const { name, password, specialization, regNo, location , fee} = req.body;
    var lindex = 0;
    if (name && password && specialization && regNo && location) {

        db
            .insert({
                NAME: name,
                REGNO: regNo,
                SPECIALIZATION: specialization,
                LOCATION: location,
                FEE: fee,
            })
            .into('registerdoctor')
            .catch(err => { res.json("Please enter unique user name") })
            .then(flag => db.select('last_inserted_id()').from('registerdoctor'))
            .then(id => {
                lindex = id[0]
            })
            .then((flag) => {

                db.insert({
                    DOC_ID: lindex,
                    NAME: name,
                    PASSWORD: password,
                })
                    .into('doctorcredentials')
                    .catch(err => { res.json(err) })
            })
            .then(() => {
                db.select('NAME').from('registerdoctor').where({ DOC_ID: lindex })
                    .then(user => res.json(user[0].NAME))
            })
            .catch(err => { res.json(err.sqlMessage) })
    }
    else {
        res.json("field not filled")
    }
}







//Export the functions
module.exports = {
    handleGetRegisterDocs: handleGetRegisterDocs,
    handleInvalidDoc: handleInvalidDoc,
    handleRegisterDoc: handleRegisterDoc,
    handleValidDoc: handleValidDoc,
    handleSearchDoc: handleSearchDoc,
    handleGetAllDocs: handleGetAllDocs,
    handleGetValidDocs: handleGetValidDocs,
    handleSearchInAllDocs: handleSearchInAllDocs,
    handleGetBlogs: handleGetBlogs,
    handleUpdateBlog: handleUpdateBlog,
    handleDeleteBlog:handleDeleteBlog,
    handleCreateBlog:handleCreateBlog,
    handleGetSingleBlog:handleGetSingleBlog
}