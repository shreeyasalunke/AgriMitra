package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.model.Tool;

public interface ToolRepository extends JpaRepository<Tool, Long> {

	List<Tool> findByToolOwnerId(Long toolownerId);

//	@Query("SELECT t FROM Tool t WHERE " + "t.name LIKE %:keyword% OR " + "t.toolCategory.name LIKE %:keyword% AND "
//			+ "t.toolOwner!=null")
//	List<Tool> searchByNameOrCategory(@Param("keyword") String keyword);
	
	@Query("SELECT t FROM Tool t " +
		       "LEFT JOIN t.toolCategory c " +
		       "WHERE (LOWER(t.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
		       "OR LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
		       "AND t.toolOwner IS NOT NULL")
		List<Tool> searchByNameOrCategory(@Param("keyword") String keyword);


}
