using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Elearn.Data.Entities;
using Elearn.Data.Entities.Interfaces;

namespace Elearn.Data.Repository.Base
{
    public interface IEntityRepository<T> where T : class, IEntityBase
    {
        IQueryable<T> GetAll();
        IQueryable<T> GetAllNoneDelete();
        Task<T> GetSingleAsync(int id);
        Task<T> GetSingleAsync(Expression<Func<T, bool>> predicate);
        Task<T> GetSingleAsyncNoneDeleted(Expression<Func<T, bool>> predicate);
        Task<T> GetSingle(int id);
        T GetSingle(Expression<Func<T, bool>> predicate);
        T GetSingleNoneDeleted(Expression<Func<T, bool>> predicate);
        T Add(T entity);
        T Update(T entity);
        T Delete(T entity);
        T DeleteEntire(T entity);
        bool CommitChanges();
        Task<bool> CommitChangesAsync();
        int Count(Expression<Func<T, bool>> predicate);
        Task<int> CountAsync(Expression<Func<T, bool>> predicate);
        int Count();
        Task<int> CountAsync();

    }
}
