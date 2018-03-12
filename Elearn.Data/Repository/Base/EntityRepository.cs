using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Elearn.Data.Entities.Interfaces;

namespace Elearn.Data.Repository.Base
{
    public class EntityRepository<T> : IEntityRepository<T> where T : class, IEntityBase
    {
        private readonly IEntitiesContext _context;

        public EntityRepository(IEntitiesContext context)
        {
            _context = context;
        }

        #region Get

        public virtual async Task<T> GetSingleAsync(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public virtual async Task<T> GetSingleAsync(Expression<Func<T, bool>> predicate)
        {
            return await _context.Set<T>().FirstOrDefaultAsync(predicate);
        }

        public virtual async Task<T> GetSingleAsyncNoneDeleted(Expression<Func<T, bool>> predicate)
        {
            return await _context.Set<T>().Where(e => !e.IsDeleted).FirstOrDefaultAsync(predicate);
        }

        public virtual async Task<T> GetSingle(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public virtual T GetSingle(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>().FirstOrDefault(predicate);
        }

        public virtual T GetSingleNoneDeleted(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>().Where(e => !e.IsDeleted).FirstOrDefault(predicate);
        }

        public virtual IQueryable<T> GetAll()
        {
            return _context.Set<T>();
        }

        public virtual IQueryable<T> GetAllNoneDelete()
        {
            return _context.Set<T>().Where(t => !t.IsDeleted);
        }

        public virtual int Count()
        {
            return _context.Set<T>().Count();
        }

        public virtual int Count(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>().Count(predicate);
        }


        public virtual async Task<int> CountAsync()
        {
            return await _context.Set<T>().CountAsync();
        }

        public virtual async Task<int> CountAsync(Expression<Func<T, bool>> predicate)
        {
            return await _context.Set<T>().CountAsync(predicate);
        }

        public IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>().Where(predicate);
        }

        #endregion

        #region Create, Update, Delete, Commit

        public virtual T Add(T entity)
        {
            if (entity == null)
                return null;

            if (_context.Entry(entity) != null)
            {
                entity.CreatedDate = DateTime.Now;
                _context.Entry(entity).State = EntityState.Added;
                return entity;
            }

            return null;
        }

        public virtual T Update(T entity)
        {
            if (entity == null)
                return null;

            if (_context.Entry(entity) != null)
            {
                entity.ModifiedDate = DateTime.Now;
                _context.Entry(entity).State = EntityState.Modified;
                return entity;
            }

            return null;
        }

        public virtual T Delete(T entity)
        {
            if (entity == null) return null;

            if (_context.Entry(entity) != null)
            {
                entity.IsDeleted = true;
                entity.DeletedDate = DateTime.Now;
                _context.Entry(entity).State = EntityState.Modified;
            }
            return entity;
        }

        public virtual T DeleteEntire(T entity)
        {
            if (entity == null) return null;

            if (_context.Entry(entity) != null)
            {
                _context.Entry(entity).State = EntityState.Deleted;
            }
            return entity;
        }

        public void DeleteWhere(Expression<Func<T, bool>> predicate)
        {
            IEnumerable<T> entities = _context.Set<T>().Where(predicate);

            foreach (var entity in entities)
            {
                _context.Entry<T>(entity).State = EntityState.Deleted;
            }
        }

        #endregion

        #region Commit

        public virtual bool CommitChanges()
        {
            return _context.SaveChanges() > 0;
        }

        public virtual async Task<bool> CommitChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        #endregion

    }
}
